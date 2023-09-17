![loogo111 (1)](https://github.com/dourian/twinterest/assets/122124464/be1575d1-969a-4ee6-9e83-337271c46846)



# Pinetrest 🌲: Know Before You Go!
Pinetrest is a maps-based social media app targeted towards trailblazers who love the outdoors, allowing users to see and share the conditions of various trails, parks, and lookouts in real-time via posts created by other users.

## Meet the Team!
This project was created at Hack the North 2023 in Waterloo, Ontario by Dorian Chen, Rui Chen (no relation), and Bryant Zheng.

## The Problem 🔎?
As browsing twitter has (hopefully) taught us, photos we see online can't be trusted! This is especially the case for outdoor areas, where different seasonal conditions like wildfires or rain can cause any given area to turn on a dime, differing from what you expected it to be - whether making it all the more breathtaking, or more often, disappointing.

## The Solution 🧠?
With Pinetrest (pine tree + Pinterest 😄), you are able to see what trail conditions are like in real-time before you set off on your hike through public posts created by you and other users.

## Our Tech Stack 💻
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

Our frontend was built with React, JavaScript, and Tailwind. Our backend features Javascript, Firebase, Cloud Firestore, and the Google Maps API.

## Our Use of Google Cloud
While searching for an online database to use for our program, none fit better than Google Cloud. We used Google Cloud through Cloud Firestore, a flexible, scalable, cloud-hosted, NoSQL database for mobile, web, and server development from Firebase and Google Cloud. It was the perfect match to what we were building because of Google Cloud's powerful infrastructure which brings automatic multi-region data replication and strong consistency guarantees. Due to the global nature of our program, we must have extremely consistent service throughout every region, with many of them in low-service areas like national parks, hence Google Cloud's ability to host regional buckets to store images was a must to reduce latency. Cloud Firestore to was designed to handle the toughest database workloads from the world's biggest apps, reassuring us that our large amounts of fetches and uploads would not be a problem.

Moreover, another extremely attractive feature of Google Cloud and Cloud Firestore is the sheer flexibility of datatypes that can be stored. It ranges all the way from geolocations to images, the latter of which was not supported by many SQL databases like CockroachLabs. The versatility of the storable data offered by Google Cloud was the key to making our project possible because of our reliance on fetching and storing images. In addition, their support of nesting of these data types can also prove to be critical in the future, given we scale to require sorting of data based on location, since each nest of data can be a drainage basin for the area which reduces querying time.

## Our Use of GitHub and Collaborative Technology
Our entire team collaborated on a GitHub repository, using the push, pull, and version control systems of GitHub to the fullest. We were able to efficiently and effectively work together to accomplish our goal thanks to this. In particular, we found a lot of success using plugins like LiveShare in VsCode for collaboration. LiveShare was a Google Docs-esque program that let us all edit the same file in real-time. Our program had a small number of very dense files that served as the controllers for our API, so this made it very convienent for us to all work on the API controller together, one person per query operation, without needing to wait until another person was done. It was a huge boon to our efficiency. All in all, we used collaborative technology in near all aspects of our weekend of hacking here at Hack the North 2023.

## Looking to the Future 🤖: Expanding
There is definitely room to build out this app even as a general social media app. We believe that people would enjoy seeing where their friends are and see what's happening over at that spot everyone seems to be swarming towards.

Notably, something we'd like to add is for the program to group all the thumbnail images of posts in a certain catchment area for a hotspot and show them all through a vertically scrolling list. This way the user can navigate and browse all the posts without the hassle of overlapping.

## Challenges We Ran Into 🤕
The main challenge that we faced early on was that in the API call we wrote, we could not extract images in the correct format from our request body. To elaborate, Cloud Firestore is particularly picky about how files are uploaded, only accepting those that are of the form of a JavaScript File. We tried many different methods to work around this to no avail. It was not entirely fruitless, as we self-taught ourselves many different skills and techniques, but we still were not able to extract these images appropriately.

eventually, we sought out the help of a mentor, who gave us a bit of direction. we were then able to find a middleware called multer, and so we were able to overcome this challenge.

this challenge enforced in us that while it is definitely correct to try to solve problems on our own to the best of our abilities, it is also good to know when it is more worthwhile to ask for a bit of help!

# thanks for reading through! we hope you have a great day - stay kind!
## total visitor counter:
![Visitor Count](https://profile-counter.glitch.me/{dourian}/count.svg)

