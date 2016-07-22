var Flux = require('flux-react');
var _ = require('lodash');

var Actions = require('./actions.js');
var Service = require('./service.js');
var CONST = require('../../globals/constants.js');

module.exports = Flux.createStore({
    // Declare global vars
    getUserTribe: null,
    getTribeInfo: null,
    getAllData: null,
    getTribeData: null,
    getEventInfo: null,
    modalData: null,
    getScore: null,

    // Define actions
    actions: [
        Actions.setUserTribe,
        Actions.setTribeInfo,
        Actions.setAllData,
        Actions.setEventInfo,
        Actions.toggleModal,
        Actions.addScore
    ],

    // Action handlers
    toggleModal: function(data){
        this.modalData = data;
        this.emit('toggleModalState.loaded');
    },
    addScore: function(data){
        var self = this,
            d = '';
            
            for(var i = 0; i < data.length; i++){
                for(var j in data[i]){
                    d += j +'='+data[i][j];
                }
                if(i !== data.length-1){
                    d += '&';
                }
            }
        Service.addNewScore(d, function(resp){
            self.getScore = resp;
            self.emit('addScore.loaded');
        });
    },
    setEventInfo: function(){
        var self = this;
        Service.getEventInformation(function(data){
            self.getEventInfo = data;
            self.emit('setEventInfo.loaded');
        });
    },
    setUserTribe: function(id){
        var self = this;

            Service.getTribesInformation(function(data){
                for(var i=0; i < data.length; i++){
                    if(data[i]._id === id){
                        self.getUserTribe = data[i];
                        window.localStorage.setItem('ymca_userTribe', JSON.stringify(data[i]));
                        break;
                    }
                }
                self.emit('setUserTribe.loaded');
            });
    },
    setTribeInfo: function(){
        var self = this;
        Service.getTribesInformation(function(data){
            self.getTribeInfo = data;
            self.emit('setTribeInfo.loaded');
        });
    },
    setAllData: function(id){
        var self = this;

        Service.getLeaderboard(id, function(data){

            if(id){
                self.getTribeData = data;
                self.emit('setTribeScores.loaded');
            } else {
                self.getAllData = data;
                self.emit('setAllScores.loaded');
            }
        });
    },
    // Callable methods
    exports: {
        loadUserTribe: function () {
            return this.getUserTribe;
        },
        loadAllData: function () {
            return this.getAllData;
        },
        loadTribeInfo: function () {
            return this.getTribeInfo;
        },
        loadTribeData: function () {
            return this.getTribeData;
        },
        loadEventInfo: function () {
            return this.getEventInfo;
        },
        toggleModalStatus: function () {
            return this.modalData;
        }
    }
});