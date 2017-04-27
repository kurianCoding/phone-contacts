angular.module('todo',['ui.bootstrap','angular-slideout-panel'])
    .controller('TodoController',['$scope','angularSlideOutPanel','$uibModal',function($scope,angularSlideOutPanel,$uibModal){
	$scope.list=[{text:'http',done:false},{text:'crossword',done:true}];
	// a function to add an item to a todo list
	$scope.addItem=function(){
	    $scope.list.push({text:$scope.text,description:$scope.description});
	    $scope.text='';
	    $scope.description='';
	}
	$scope.remainingItems=function(){
	    var count=0;
	    angular.forEach($scope.list, function(item){
		count+=item.done?0:1;
	    })
	    return count;
	}
	$scope.openModal=function(id){
	    angularSlideOutPanel.open({
		templateUrl:'form.html',
		openOn:'right',
		controller:['$scope',panelController],
	    });
	    function panelController($scope){
		$scope.closePanel=function(){
		    $scope.$panelInstance.close('closed panel');
		}
		$scope.dismissPanel=function(){
		    $scope.$panelInstance.dismiss('dismissed panel');
		}
		$scope.addItem=function(){
		    $scope.list.push({text:$scope.text,description:$scope.description});
		    $scope.$panelInstance.close('closed panel');
		}
	    }
	}
    }]);
