# Webaudio modular experiment

This is an experiment for implementing a naive modular synthesizer using WebAudio and ScriptProcessorNode.

My previous attempts to create such a system have ended up failing since using multiple ScriptProcessorNodes (one per module) simply won't provide the needed performance and the overhead of one script processor per one module is just too high. So this way of implementing a modular synthesizer system has proven to be too performance heavy.

In this experiment though the idea is to discard the concept of using multiple script processors. Instead in this experiment the whole modular system in will be "complid" into a single ScriptProcessorNode, and the code of each modules will be compiled into a single function. Picture below will try to explain the idea:

Let's consider following naive system with two modules.

```
----------       -------------
| Noise  |------>| Audio Out |
|        |       |           |
----------       -------------
```

Noise module:
```
OUTLET_NOISE[i] = Math.random();
```

Audio Out module:
```
OUT_BUFFER[i] = INLET_AUDIO_OUT[i];
```

Resulting output of the following configuration will result one (1) function to be run in a single ScriptProcessorNode.

```
function (evt) {
  const OUT_BUFFER = evt.outputBuffer.getChannelData(0);
  const OUTLET_NOISE = [];
  const INLET_AUDIO_OUT = [];

  for (var i = 0; i < OUT_BUFFER.length; i++) {
    OUTLET_NOISE[i] = Math.random();

    INLET_AUDIO_OUT[i] = OUTLET_NOISE[i]

    OUT_BUFFER[i] = INLET_AUDIO_OUT[i];
  }
}
```

So basically one node with _outlets_ will result following code to be generated

* Outlet variable declarations
* Assingment of the generated value into the declared outlet
* Assingment of the value from outlet to a possibly connected inlet

...while a node with _inlets_ will result following code

* Inlet variable declarations
* Assingment of the (possibly) connected outlet into the inlet
* Assingment and processing the inlet value
