window.onload = function () {
            document.getElementById('search').addEventListener('click', showResults)
        }
        function showResults() {
            var searchTerm = document.querySelector('input[name="searchTerm"]').value
            var url = 'https://en.wikipedia.org/w/api.php?format=json&action=opensearch&origin=*&search=' + searchTerm;
            var outputWiki = document.querySelector('#outputWiki');
            var outputYoutube = document.querySelector('#outputYoutube');
            outputWiki.innerHTML = "<h2>Search Term " + searchTerm + "<h2>";
            outputYoutube.innerHTML = "<h2>Videos of " + searchTerm + "<h2>";
            ajaxJS(url, function (response) {
                console.log(response)
                for (var x in response) {
                    var holder = typeof response[x] == 'string' ? response[x] : response[x][0];
                    outputWiki.innerHTML += '<div class="dataOutput">' + holder + '</div>';
                }
            })
            var url1 =
              "https://www.googleapis.com/youtube/v3/search/?part=snippet&key=AIzaSyA05skSy_wal8QvI51NCPs-4Xnsv3YNw7Q&q=" +
              searchTerm +
              "&maxResults=4";
            ajaxJS(url1, function (data) {
                console.log(data)
                for (var x in data.items) {
                    var title = data.items[x].snippet.title;
                    var desc = data.items[x].snippet.description;
                    var thumb = data.items[x].snippet.thumbnails.default.url;
                    var videoID = data.items[x].id.videoId;
                    outputYoutube.innerHTML += '<div class="panel"><div class="wrap"><div class="content">' + title + '</div><a href="https://youtu.be/' + videoID + '" target="_blank"><img src="' + thumb + '" alt="' + title + '"></a></div></div>'
                }
            })
        }
        function ajaxJS(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    callback(JSON.parse(xhr.responseText))
                }
            }
            xhr.open('GET', url, true)
            xhr.send();
        }