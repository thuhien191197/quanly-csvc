

# Front end about Facilities Management System of Da Nang University of Technology
## About
This is the project of ReactJS subject and Human-Machine communication that I learned in my group's 1 year 4 semester.

## Development and Build Process
In the project directory, you can run.

| Command | Description |
| ------- | ----------- |
| `npm start` or `yarn start`| Starts development server with hot reloading. |
| `node sever.js`| Then, download the json-server to demo the data for this project: https://github.com/thuhien191197/server-csvc. |
| `make run`| Then, download the Backend code of Login API for this project this project: https://github.com/thuhien191197/login-csvc |


Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## image
![React-News](https://a.imge.to/2019/07/26/ZK9Dj.png)
![React-News](https://c.imge.to/2019/07/26/ZK1JO.png)

#### Reference path
ScrollBar: https://codepen.io/devstreak/pen/dMYgeO

---
## config NGIX
### INSTALL NGINX
		sudo apt-get update
		sudo apt-get install nginx

### GO TO FOLDER /etc/nginx/sites-enabled add file csvc.conf
### OPEN FILE /etc/hosts, add line 
		127.0.0.1 	csvc.com
### remember run before run app
		sudo nginx -s reload 
