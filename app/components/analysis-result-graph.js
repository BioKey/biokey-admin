import Ember from 'ember';

export default Ember.Component.extend({
	analysisResults: [],
	typingProfile: null,
	initialWindow: 24 * 60 * 60 * 1000,
	pollingWindow: 8000,
	shouldLoadChart: false,

	dataMin: 0,
	dataMax: 0,
	chartMin: 0,
	chartMax: 0,
	sliderMin: 0,
	sliderMax: 0,
	sliderPosition: [1, 1],
	isSliding: false,

	chartFormattedResults: Ember.computed('analysisResults.@each.timestamp', function() {
		let self = this;
		let results = [
			['timestamp', 'probability']
		];
		results.pushObjects(this.get('analysisResults').map(function(result, index) {
			return [new Date(result.get('timestamp')), result.get('probability')];
		}));
		return results;
	}),
	chartOptions: {
		title: 'Percent Probability of Authentic User (Last 24 Hours)',
		height: 480,
		legend: {
			position: 'none'
		},
		hAxis: {
			title: '',
			gridlines: {
				count: -1,
				units: {
					days: { format: ['MMM dd'] },
					hours: { format: ['HH:mm', 'ha'] }
				}
			},
			minorGridlines: {
				units: {
					hours: { format: ['hh:mm:ss a', 'ha'] },
					minutes: { format: ['HH:mm a Z', ':mm'] }
				}
			}
		},
		vAxis: {
			viewWindow: {
				min: 0,
				max: 1
			}
		}
	},

	init() {
		this._super(...arguments);
		Ember.run.later(() => this._poll(), this.get('pollingWindow'));
	},

	_poll() {
		let self = this;
		if (!self.isDestroyed) {
			let tempDataMax = this.get('dataMax');
			this.set('dataMax', Date.now());
			if (this.get('chartMax') == tempDataMax) {
				this.set('chartMax', this.get('dataMax'));
				this.set('sliderMax', this.get('dataMax'));
				if (!this.get('isSliding')) {
					this.set('sliderPosition', [this.get('sliderPosition')[0], this.get('sliderMax')]);
				}
			}

			this.get('onRefresh')(tempDataMax, this.get('dataMax'), this.get('typingProfile')).then((results) => {
				self.get('analysisResults').pushObjects(results.toArray());
				if (this.get('chartMax') == this.get('dataMax')) {
					self.set('chartOptions.hAxis.viewWindow', {min: self.get('chartMin'), max: self.get('chartMax')});
				}
			});
			Ember.run.later(() => this._poll(), this.get('pollingWindow'));
		}
	},

	didReceiveAttrs() {
		this._super(...arguments);

		// Reset analysisResults
		this.set('analysisResults', []);
		
		this.set('dataMax', Date.now());
		this.set('chartMax', this.get('dataMax'));
		this.set('sliderMax', this.get('dataMax'));
		this.set('dataMin', this.get('dataMax') - this.get('initialWindow'));
		this.set('chartMin', this.get('dataMin'));
		this.set('sliderMin', this.get('dataMin'));

		let self = this;
		this.get('onRefresh')(this.get('dataMin'), this.get('dataMax'), this.get('typingProfile')).then((results) => {
			let vanillaResults = results.toArray();
			self.get('analysisResults').pushObjects(vanillaResults);
			console.log(self.get('analysisResults'));
			self.set('chartOptions.hAxis.viewWindow', { max: self.get('chartMin'), min: self.get('chartMax') });
			self.set('sliderPosition', [self.get('sliderMin'), self.get('sliderMax')]);
			self.set('shouldLoadChart', true);
		});
	},

	actions: {
		sliderChangeAction: function(val) {
			this.set('sliderPosition', val);
			this.set('chartMin', val[0]);
			this.set('chartMax', val[1]);
			this.set('chartOptions.hAxis.viewWindow.min', val[0]);
			this.set('chartOptions.hAxis.viewWindow.max', val[1]);
		},
		sliderStartAction: function(val) {
			this.set('isSliding', true);
		},
		sliderEndAction: function(val) {
			this.set('isSliding', false);
		}
	}
});