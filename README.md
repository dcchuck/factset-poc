# FactSet POC

## Quick Start
Clone this repo.
```bash
npm install
npm start
```

## Use

1. Launch Yahoo Finance and any number of FactSet views (a full quote view, type selectable in the radio button)
2. Select an FDC3 Context object to send in the dropdown. 
3. Publish the context to update all applications.

## How It Works

### Controller App

The main window that is launched is an HTML page that is locally hosted & launched on OpenFin.

#### Creating The Yahoo Finance & FactSet Apps

There are several ways to create a new Application on OpenFin. In this demo, we use the Application Constructor.

* [Application Constructor](http://cdn.openfin.co/jsdocs/stable/tutorial-application.constructor.html)
* [createFromManifest](http://cdn.openfin.co/jsdocs/stable/tutorial-application.createFromManifest.html) - This would target a hosted application manifest. You can still dynamically generate its content on the server however. The advantage here is that your app will be launched via the RVM.
* [Fin Protocol aka Deep Linking](https://github.com/openfin/Deep-linking) - This allows you to pass around links to OpenFin appliactions, just like you'd pass around links to a web application. Also supports query parameters.

An application is a separate render process. You can also create new Windows (http://cdn.openfin.co/jsdocs/stable/tutorial-window.constructor.html) which would be part of the parent application. For example, if I wanted to create several views and have them all close when I close my controller app, I could either add logic to my controller app to close all apps it opened when it closes, or just create child windows from the parent. The OpenFin API supports full lifecycle management of both windows & apps.

#### Communicating Between Apps

In this demo, we leverage the InterApplicationBus to send messages on a button click to all Applications subscribing to updates. The InterApplicationBus is a simple pub/sub interface.

* [.publish](http://cdn.openfin.co/jsdocs/stable/tutorial-inter-application-bus.publish.html) - Broadcasts a message across the desktop to any app that is subscribing.
* [.subscribe](http://cdn.openfin.co/jsdocs/stable/tutorial-inter-application-bus.subscribe.html) - Subscribes to messages on a channel. In this demo we are only listening for updates from the controller app. You can also create wild card subscriptions (listen to anyone talking on a channel)
* [.send](http://cdn.openfin.co/jsdocs/stable/tutorial-inter-application-bus.send.html) - Send a message to on a specific application.

The new services API provides an easy way to create a central state management/communication layer other apps can talk to asynchronously.

## Potential Improvements

* Snap & Dock Windows w/Layout Service
* Default window sizing
* Pass the last context over on new view creation
* Interface for selecting what view to update on publish
* View for describing desktop state
* Add as many factset views as you want!
