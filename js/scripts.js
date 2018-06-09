$(document).ready(function(){
    $('#search').on('keyup', function(e){
        //Get the current value of the user name
        let userName = e.target.value;

        // Ajax call
        $.ajax({
            //Ajax call for the user profile
            url: 'https://api.github.com/users/' + userName,
            data: {
                //For Auth
                client_id: '3a10dc51cb7ab5baa613',
                client_secret: 'aef47fd0998e88aeee43e8431e05577146c57659'
            }
        }).done(function(user){
            $.ajax({
                //Ajax call for the repos
                url: 'https://api.github.com/users/' + userName + '/repos',
                data: {
                    client_id: '3a10dc51cb7ab5baa613',
                    client_secret: 'aef47fd0998e88aeee43e8431e05577146c57659',
                    sort: 'created: asc', //To sort the represented data
                    per_page: 5 //To maximize the number of the received repos
                }
            }).done(function(repos){
                //Loop over the repos
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong> : <span>${repo.description}</span>
                                </div>

                                <div class="col-md-3">
                                    <span class="label label-default">Public Repos : ${repo.forks_count}</span>
                                    <span class="label label-primary">Stars : ${repo.stargazers_count}</span>
                                    <span class="label label-success">Watchers : ${repo.watchers_count}</span>
                                </div>

                                <div class="col-md-2">
                                    <a target="_blank" href="${repo.html_url}" class="btn btn-default btn-block">View Repo</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            $('#profile').html(`
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">${user.name}</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${user.avatar_url}" class="thumbnail avatar"/>
                                <a target="_blank" href="${user.html_url}" class="btn btn-primary btn-block">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="label label-default">Public Repos : ${user.public_repos}</span>
                                <span class="label label-primary">Public Gists : ${user.public_gists}</span>
                                <span class="label label-success">Followers : ${user.followers}</span>
                                <span class="label label-info">Following : ${user.following}</span>
                                <br><br>
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        Company : ${user.company}
                                    </li>

                                    <li class="list-group-item">
                                        Location : ${user.location}
                                    </li>

                                    <li class="list-group-item">
                                        Bio : ${user.bio}
                                    </li>

                                    <li class="list-group-item">
                                        Blog : ${user.blog}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <hr>
                        <h3 class="page-header">Latest Repos<h3>
                        <div id="repos">
                        </div>
                    </div>
                </div>
                
            `);
        });
    });
});