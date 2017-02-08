# How To add new languages for facades

1. create a new js file in the folder facade
1. fill this file with a facade in the new language (basis can be the german (irrgarten.js) or the english (labyrinth.js) facade)
1. the new translations also must be add in the maze/wall.js: 
   1. for the orientation of the walls you have to add the new translations to the function mapOrientation
   1. for the new command for creating a wall you have to add a new function with the new translated name see function erzeugen or generate
1. to use the new facade you must import the facade in your example (see exampleWithFacade.js)

