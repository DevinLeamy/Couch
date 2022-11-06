# Think Tank Team Coding Challenge Submission (Summary)
#### _Author: Devin Leamy_

### Thoughts and process
This coding challenge has been a lot of fun. Going into it I didn't have any experience working with
3D web animations (nor very much with 3D animation as a whole). I learned a lot. 

Jumping into it, I wasn't sure what technologies I wanted to use to approach the challenge. In fact, I initially
wrote a small scene renderer in [`bevy`](https://bevyengine.org) before concluding that it lacked many of the features
(mainly a flexible UI system and a fast development workflow) that I needed to accomplish this challenge in a reasonable 
amount of time. I ultimately settled on using `Three.js` and `React`, which consequently led me to `react-three-fiber`.

To my surprise, modern support for 3D web applications is very good and it didn't take long to get up to speed with the tools.

Because I was y using `bevy`, which has limited support for 3D models, all the 3D assets I collected were `gltf`/`glb` models.
_(This ended up presenting a challenge when I went to implement dynamic meshes (opacity, color) for items because `react-three-fiber` `<primitive />`s 
are not very flexible, which led me to `gltfjsx`.)_ 

### Time 

The whole challenge was completed in a little over 12 hours, spread over three days. My `bevy` false-start took a couple of hours so 
it was more like ten hours, but it was part of the process, nonetheless. 

### Features
I chose to implement certain features that were not required over some of the other requested features. Namely, I added an orbit camera, element highlights,
lighting, and cursor controls, and did not implement togglable elements and collision resolution. Given that my models are `gltf`s collision detection is a non-trivial problem, in `react-three-fiber`. Implementing it looks to require tinkering with the models themselves and using [react-three-rapier](https://github.com/pmndrs/react-three-rapier), or similar. Like adding togglable elements, it's 100% doable but would just require a couple more hours, and I didn't want to exceed the estimated time budget by too much. I felt the feature set I chose to implement contributed more to the <i>feel</i> of the application, so that's where I spent my time.

### Summary

The backend architecture can be found in `BACKEND.pdf`, the demonstration video is titled `demo.mp4`, the front end code is in `frontend/`, and the frontend instructions are in `FRONTEND.pdf`. 

I enjoyed the challenge - a mini hackathon in some respects - and I hope you enjoy reviewing my submission! 

Thanks for the opportunity to showcase what I can do, and I hope I'll get to talk to some of the great folks on the `Think Tank Team` soon enough! You guys have done some incredible work!
