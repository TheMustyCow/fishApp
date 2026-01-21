# Fish Tracker Application

## Overview
- My senior project at EWU is a fishing application that a allows a user to pin where they caught a fish (or multiple), and other information from that fishing trip.
- I was looking at different options for how we wanted to create our application, and since we want a mobile application I thought about using [React Native](https://reactnative.dev/).
    - I chose React Native because of the cross platform compatibility from iOS to Android.
- I decided it would be good to use JavaScript because of React Native, but also an easier language for the group to get into, as opposed to TypeScript.
- I wanted to create a sample project to give idea/structure to our project.

## Features
- Scrollable map view.
- A user can press and hold to drop a pin. Once the pin is placed they will be prompted to enter various information about the fish, such as:
    - Species
    - Number caught
    - Date/Time
    - Amount of other fisherman on location
    - Difficulty of entrance/Ease of access
- Search for species

## Ai prompt
- The following was sent to `grok fast`:
- I would like you to make a fishing application that could also be used just by researchers. This minimalist application would have just over half of the screen be a map, and the map is a minimalist scroll-view similar to google or apple maps. A use can HOLD on a spot and the app will prompt them to add an entry that is a pin, once they start that, a whole page entry popup will pop up from the bottom of the screen and will allow them to enter the species of fish, how many they caught, the time and date, how many other fishermen were there, and the difficulty to get to the spot (easy, medium, hard). Once all that is entered, underneath the user could add another entry for that specific pin/location. We would hope to have the work as a desktop application as well, something cross compatible, but the main focus would be the mobile view. Another feature would be a search bar at the top where the user can type a species of fish, and see all the points (pins) where someone caught such a fish.