# Defining the parent image to use build our image from. Possibly updated to latest, centos7 after testing
FROM centos:centos6

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN yum install -y epel-release

# Install Node.js and npm
RUN yum install -y nodejs npm

# bundle app’s source code inside the Docker image
COPY . /src

# move into the src directory where all the source code files live. install all npm dependencies
RUN cd /src; npm install

#map port 8000 to the docker daemon.
#REMEMBER TO CHANGE THIS IF THE PORT IS CHANGED IN server.js
EXPOSE 8000

#define the command line code that will start up the server
CMD ["node", "/src/server/server.js"]

