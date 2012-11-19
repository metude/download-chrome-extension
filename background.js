window.addEventListener('DOMContentLoaded', function() {
    
    if (opera.contexts.menu) { // Check the Context Menu API is supported
        var menu = opera.contexts.menu; // Create a menu item properties object
        var itemProps = {
            contexts: ['page', 'link'],
            icon: 'images/chrome.png',
            documentURLPatterns: [
              'http://chrome.google.com/webstore/*',
              'https://chrome.google.com/webstore/*'
            ],
            title: strings['download-it'],
            onclick: function(event) {
                var tabProps = {}; // Create a tab properties object, opera extension api to use it later.
                var currentTab = opera.extension.tabs.getFocused(), currentUrl = currentTab.url;
                var pathArray = currentUrl.split('/'); // try to get id of extension.
                var lastArray = pathArray[6].split('?'); // now eliminate localization strings (?hl=tr e.g.)
                tabProps.url = "https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D" + lastArray[0] + "%26uc"; // magic
                currentTab.update({url: tabProps.url}); // Update a tab with the specified properties
            }
        }
        var item = menu.createItem(itemProps); // Create a menu item with the specified properties
        menu.addItem(item); // Add the menu item to the context menu
    } else {
        console.error('Context Menu API not supported.');
    }
}, false);