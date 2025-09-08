# Project Context File

## Overview
This project leverages multiple JavaScript files for managing various components of an interactive game, alongside supporting assets and configurations defined in HTML and CSS.

## JavaScript Files
- **characterImages.js**: Handles the association of characters with their corresponding images.
- **eventListeners.js**: Manages event listeners for interactive elements.
- **gameMechanics.js**: Contains core game logic and functions to run the game.
- **gameQuestions.js**: Focuses on the question mechanics within the game.
- **mapMechanics.js**: Logic for handling map-related functionalities.
- **playerSelection.js**: Deals with player setup and selection.
- **refactoredNotes.js**: Probably used for documenting code improvements or notes on refactoring.

## Assets
The assets directory consists of images, icons, cards, and other visual elements used within the game.

## Configurations
- **build.gradle**: Defines the build configurations for the project.
- **README.md and other markdown files**: Provide documentation and project insights.

## Development Environment
- **Java Version**: 17.0.14

## HTML and CSS
- **index.html**: The main HTML file structuring the webpage that hosts the game.
- **styles.css**: Manages the styling and appearance of the game interface.

## Project Structure
```
/
  .gitignore
  .idea/
    .gitignore
    compiler.xml
    gradle.xml
    ktfmt.xml
    misc.xml
    vcs.xml
    workspace.xml
  IMPLEMENTATION.md
  QUESTIONS.md
  README.md
  Talk-It-Out.iml
  assets/
    box.png
    cards/
      cardsinfo.txt
      crab/
        back_depth.png
        back_shallow.png
        back_shore.png
        front_depth.png
        front_shallow.png
        front_shore.png
      dolphin/
        back_depth.png
        back_shallow.png
        back_shore.png
        front_depth.png
        front_shallow.png
        front_shore.png
      eel/
        back_depth.png
        back_shallow.png
        back_shore.png
        front_depth.png
        front_shallow.png
        front_shore.png
      flatfish/
        back_depth.png
        back_shallow.png
        back_shore.png
        front_depth.png
        front_shallow.png
        front_shore.png
      pufferfish/
        back_depth.png
        back_shallow.png
        back_shore.png
        front_depth.png
        front_shallow.png
        front_shore.png
    cards.png
    icons/
      crab-icon.png
      dolphin-icon.png
      eel-icon.png
      flatfish-icon.png
      pufferfish-icon.png
      star.png
    js/
      characterImages.js
      eventListeners.js
      gameMechanics.js
      gameQuestions.js
      mapMechanics.js
      playerSelection.js
      refactoredNotes.js
    logo.png
    map.png
    rulebook.png
  build.gradle
  gradle/
    wrapper/
      gradle-wrapper.jar
      gradle-wrapper.properties
  gradlew
  gradlew.bat
  index.html
  styles.css
```
