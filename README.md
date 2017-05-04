# Flask Skeleton to use in web applications at Box

Language Python3

## Quick Start

This app uses css and js libraries, below:
 - [Bootstrap 3](http://getbootstrap.com/)
 - [SweetAlert](http://t4t5.github.io/sweetalert/)
 - [Font Awesome](http://fontawesome.io/)
 - [jQuery](https://jquery.com/)
 - [jQueryUI](https://jqueryui.com/)
  
 
### Basics

1. Create and activate a virtualenv
1. Install the requirements

### Set Environment Variables

Update *project/server/config.py*, and then run:

```sh
$ export APP_SETTINGS="project.server.config.DevelopmentConfig"
```

or

```sh
$ export APP_SETTINGS="project.server.config.ProductionConfig"
```

### Create DB

```sh
$ python manage.py create_db
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py create_admin
$ python manage.py create_data
```

### Run the Application

```sh
$ python manage.py runserver
```

So access the application at the address [http://localhost:5000/](http://localhost:5000/)

> Want to specify a different port?

> ```sh
> $ python manage.py runserver -h 0.0.0.0 -p 8080
> ```

### Testing

Without coverage:

```sh
$ python manage.py test
```

With coverage:

```sh
$ python manage.py cov
```
