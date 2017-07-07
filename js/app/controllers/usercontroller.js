class UserController {

    constructor() {
        new MasterView();

        this.inputComponent = new ButonSearchView();
        this.inputComponent.update();

        this.userService = new UserService();
        this.httpService = new HttpService();
    }

    get user() {
        
        let response = this.userService.user(this.inputComponent.getInput()).then(success => {

            let user = new UserDetails(
                success.followers,
                success.following,
                success.avatar_url,
                success.email,
                success.bio,
                success.login
            );

            let viewUser = new UserDetailsView();
            viewUser.template(user);

            this.repositories(success.repos_url);
        });

    }

    repositories(url) {
        this.httpService.get(url, false)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                result.forEach((element) => {
                    // console.log(element.name);
                    // console.log(element.stargazers_count);
                }, this);

                let itens = result.sort(x => x.stargazers_count).reverse()      ;

                let viewRepositories = new ListRepositoriesView();
                viewRepositories.template(itens);
            });
    }

    orderBy(order){
console.log(order);
    }

}