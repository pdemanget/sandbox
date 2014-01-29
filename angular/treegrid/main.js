// main.js
var app = angular.module('myApp', ['ngGrid']);

app.controller('MyCtrl', function($scope) {
    
   /**
    * All the group - tree stuff
    */
    
     groupTemplate=
            '<div ng-style="{\'top\':row.offsetTop+\'px\',\'left\': row.offsetLeft}" class="{{row.aggClass()}}"></div>'
            +'<div ng-click="row.toggleExpand()" ng-style="{ \'cursor\': row.cursor ,\'top\':row.offsetTop+\'px\'}" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ngCellGroup {{col.cellClass}}">'
                    +'<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>'
//                    +'<div >{{$parent.$index}}{{test(row)}}</div>' //l3
+'<div >{{aggFc(row,col) }}</div>' //l3

            +'</div>';

        var getEntity=function(row){
            //row.depth
            var depth=0;
            while(row.isAggRow){
                depth++;
                if(row.aggChildren.length>0){
                    row = row.aggChildren[0];
                }else if(row.children.length>0){
                    row = row.children[0];
                }
            }
            var entity=row.entity;
            while(depth>0){
                depth--;
                entity=entity.parent;
            }
            return entity;
            //return entity.parent;
        };

        /**
         * calcule la valeur d'une cellule du "parent"
         */
        $scope.aggFc=function(row,col){
            var entity=getEntity(row);
            if(!entity[col.field]){
                return "";
            }
            return entity[col.field]
        };

        var id=0;

        /*
         * create back-link of parent from children
         */
        var attachParent=function(tree, parent){
            angular.forEach(tree, function(node){
                node.parent=parent;
                node.id=id++;
                if (node.children){
                    attachParent(node.children,node);
                }
            });
            return tree;
        };
        /**
         * return leaves of the tree in an array
         */
        var flattenTree=function(tree){
            var result=[];
            angular.forEach(tree, function(node){
                if (node.children){
                    result=result.concat(flattenTree(node.children));
                }else{
                    result.push(node);
                }
            });
            return result;
        };
        
        
        /**
         * the "normal" grid instanciation
         */
        
        
        var myData1 = [
            {name: "Moroni",firstname: "Jack", age: 50,
                children:[{
                    name: "Moroni",firstname: "Joe", age: 30,
                }]
            },
            {name: "Tiancum",firstname: "Jack", age: 43,
                children:[{
                    name: "Tiancum",firstname: "Joe", age: 23,
                }]
            },
            {name: "Jacob",firstname: "Jack", age: 27,
                children:[{
                    name: "Jacob",firstname: "Joe", age: 7,
                }]
            }];
    
        myData1=flattenTree(attachParent(myData1));
        //myData1=attachParent(myData1,"root");
        
        $scope.gridOptions = { 
            data: 'gridData',
            sortInfo:{ fields: ['name'], directions: ['asc']},
            enableColumnResize: true,
            enableColumnReordering: true,
            groups:['parent.id'],
            aggregateTemplate:groupTemplate,
            groupsCollapsedByDefault:false,
            columnDefs: [
                {field: 'parent.id', displayName: '', visible:false}, 
                {field: 'name', displayName: 'Name'}, 
                {field: 'firstname', displayName: 'firstname'}, 
                {field:'age', displayName:'Age'}
            ]
        };
        
        $scope.gridData = myData1;

});