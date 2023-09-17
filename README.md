![loogo111 (1)](https://github.com/dourian/twinterest/assets/122124464/be1575d1-969a-4ee6-9e83-337271c46846)![cIe5MvDvX4Vc](https://github.com/dourian/twinterest/assets/122124464/fa7e6898-fa20-4f9f-9845-94f8f8da8f37)



# Pinetrest 🌲: know before you go!
pinetrest is a maps-based social media app for outdoorsmen, where users are able to see the conditions of various trails, parks, and lookouts in real-time by other users.

## meet the team!
this project was created at hack the north 2023 in waterloo, ontario by dorian chen, rui chen, and bryant zheng.

## the problem 🔎?
the photos you see online can't be trusted! this is especially the case for outdoor areas, where different conditions can cause the area to be extremely different from what you expected it to be - often disappointing.

## the solution 🧠?
with Pinetrest (pine tree + Pinterest 😄), you are able to see what trail conditions are like in real-time, as well as make your own posts for others to see!

## our tech stack 💻
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

our frontend was built with react and tailwind, backend with javascript and firebase, and using the google maps api.

## our use of google cloud
While searching for an online database to use for our program, none fit better than Google Cloud. We used Google Cloud through Cloud Firestore, a flexible, scalable, cloud-hosted, NoSQL database for mobile, web, and server development from Firebase and Google Cloud. It was the perfect match to what we were building because of Google Cloud's powerful infrastructure which brings automatic multi-region data replication and strong consistency guarantees. Due to the global nature of our program, we must have extremely consistent service throughout every region, with many of them in low-service areas like national parks, hence Google Cloud's ability to host regional buckets to store images was a must to reduce latency. Cloud Firestore to was designed to handle the toughest database workloads from the world's biggest apps, reassuring us that our large amounts of fetches and uploads would not be a problem.

Moreover, another extremely attractive feature of Google Cloud and Cloud Firestore is the sheer flexibility of datatypes that can be stored. It ranges all the way from geolocations to images, the latter of which was not supported by many SQL databases like CockroachLabs. The versatility of the storable data offered by Google Cloud was the key to making our project possible because of our reliance on fetching and storing images. In addition, their support of nesting of these data types can also prove to be critical in the future, given we scale to require sorting of data based on location, since each nest of data can be a drainage basin for the area which reduces querying time.

## our use of github
our entire team collaborated on a github repository. using the pull and version control systems of github to the fullest, we were able to efficiently and effectively working together to this successful goal. as well, we were able to create an organized hub for all of our work, including an in-depth README markdown file regarding this project and the experience that we had here! finally, all good applications deserved to be deployed, and what better way to do that with github's own github pages. all in all, we used github in near all aspects of our weekend of hacking here at hack the north 2023.

## looking to the future 🤖: expanding
there is definitely room to build out this app even as a general social media app. we believe that people would enjoy seeing where their friends are and see what areas are popular at that time based on location.

## challenges we ran into 🤕
the main challenge that we faced early on was that we could not get images to be uploaded correctly to our full-stack application. we tried many different methods and self-taught ourselves many different techniques, however we still were not able to get these images to upload properly.

eventually, we sought out the help of a mentor, who gave us a bit of direction. we were then able to find a middleware called multer, and so we were able to overcome this challenge.

this challenge enforced in us that while it is definitely correct to try to solve problems on our own to the best of our abilities, it is also good to know when it is more worthwhile to ask for a bit of help!

# thanks for reading through! we hope you have a great day - stay kind!
## total visitor counter:
![Visitor Count](https://profile-counter.glitch.me/{dourian}/count.svg)

