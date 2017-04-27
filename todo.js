angular.module('todo',['ui.bootstrap','angular-slideout-panel'])
    .controller('TodoController',['$scope','angularSlideOutPanel','$uibModal','ListService',function($scope,angularSlideOutPanel,$uibModal,ListService){
	// setting list to common list
	$scope.list=ListService.getList();
	// a function to add an item to a todo list
	$scope.addItem=function(){
	    ListService.addItem({text:$scope.text,description:$scope.description});
	    $scope.text='';
	    $scope.description='';
	}
	// function to calculate remaining items in the todo list
	$scope.remainingItems=function(){
	    var count=0;
	    angular.forEach($scope.list, function(item){
		count+=item.done?0:1;
	    })
	    return count;
	}
	// function to open the sliding panel
	$scope.openModal=function(id){
	    // angular side panel
	    angularSlideOutPanel.open({
		templateUrl:'form.html',
		openOn:'right',
		controller:['$scope','ListService',panelController],
	    });
	    // function inside the scope of the side
	    // panel
	    function panelController($scope,ListService){
		$scope.closePanel=function(){
		    $scope.$panelInstance.close('closed panel');
		}
		$scope.dismissPanel=function(){
		    $scope.$panelInstance.dismiss('dismissed panel');
		}
		$scope.addItem=function(){
		    ListService.addItem({text:$scope.text,description:$scope.description});
		    $scope.$panelInstance.close('closed panel');
		}
	    }
	}
    }]).factory('ListService',function(){
	// service for list
	// list has been initialized here
	var list=[];
	return {
	    // function to get list
	    getList:function(){
		return list;
	    },
	    // function to set the initial list
	    setList:function(input){
		list=input;
	    },
	    // function to add items ot the list
	    addItem:function(Item){
		list.push({text:Item.text,description:Item.description});
	    },
	}

    });
