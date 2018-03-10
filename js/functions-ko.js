/*ko.validation.rules.pattern.message = 'Invalid.';

ko.validation.init({
	registerExtenders: true,
	messagesOnModified: true,
	insertMessages: true,
	parseInputAttributes: true,
	messageTemplate: null
}, true);*/
ko.validation.init();

//var vm = ko.mapping.fromJS(GetData());
function GetData() {
	vm = GetMockData();
	//LoadUserData();
	//LoadCategories();
	//LoadSkills();
	return vm;
}
//function LoadUserData(){
//    $.getJSON(settings.Rest.UserMe(), function(data) { 
//        var user = data.items;  
//        vm.User.Name(user.Details.Nome);    
//        vm.User.Surname(user.Details.Cognome);
//        
//    });
//}
//function LoadCategories(){
//    $.getJSON(settings.Rest.Categories(), function(data) { 
//        var list = [];
//        data.items.forEach(cat => {
//            list.push({Title:cat.Titolo, Guid:cat.Guid});
//            //vm.Info.Categories.removeAll();
//            //vm.Info.Categories.push({Title:cat.Titolo, Guid:cat.Guid});
//        });
//        vm.Info.Categories(list);
//    });
//}
//function LoadSkills(){
//    $.getJSON(settings.Rest.Skills(), function(data) { 
//        var list = [];
//        data.items.forEach(item => {
//            list.push({Title:item.Nome, Guid:item.Guid, IsSelected:false});
//            //vm.Info.Categories.removeAll();
//            //vm.Info.Categories.push({Title:cat.Titolo, Guid:cat.Guid});
//        });
//        vm.Skills(list);
//    });
//}

function GetMockData() {
	var obj = {
		User: {
			Name: 'Alp',
			Surname: 'Senel'
		},
		Info: {
			Title: ko.observable().extend({
				required: true,
				minLength: 3
			}),
			Description: ko.observable().extend({
				required: true
			}),
			Categories: [
				{
					Title: "cat1",
					Guid: "guid1"
				},
				{
					Title: "cat2",
					Guid: "guid2"
				},
				{
					Title: "cat3",
					Guid: "guid3"
				}
            ],
			SelectedCategoryGuid: ko.observable(),
			Tags: ko.observableArray([
				{
					Title: ko.observable('alp'),
					Guid: ko.observable()
				}
			]),
			Deadline: ko.observable()
		},
		Skills: [
			{
				Title: "skill1",
				Guid: "guid1",
				IsSelected: false
			},
			{
				Title: "skill2",
				Guid: "guid2",
				IsSelected: true
			}
        ],
		Steps: [
			{
				Title: "step1",
				Guid: "guid1",
				Description: "description for step 1",
				Deadline: "2017-11-20"
			},
			{
				Title: "step2",
				Guid: "guid2",
				Description: "description for step 2",
				Deadline: "2017-11-20"
			},
        ]
	}
	return obj;
}

function createGuid (){
	var allTags = vm.Info.Tags()[0].Title();
	var eachTags = allTags.split(',');
	console.log(eachTags);
	var guid = [];
	eachTags.forEach(function(element) {
			guid.push('guid'+element);
			
	});console.log(guid);
	//var guidEach = guid.split(',');
	//vm.Info.Tags()
}

ko.applyBindings(GetData());
