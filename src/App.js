import React, {useEffect, useState} from 'react';
import firstSounds from './sounds/sounds1.js';
import secondSounds from './sounds/sounds2.js';

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Piano Kit"
};

const soundsGroup = {
  heaterKit: firstSounds,
  smoothPianoKit: secondSounds
}

const DrumKey = ({ play, deactivateAudio, sound: { key, url, id, keyCode }}) => {
  
  const handleKeydown = (e) => {
    if(e.keyCode === keyCode){
      const audio = document.getElementById(key)
      play(key, id)
      deactivateAudio(audio)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
  }, [])

  return (
    <button className="drum-pad border-4 rounded p-4 shadow-lg" id={keyCode} onClick={() => play(key, id)} >
      <audio className="clip" id={key} src={url} />
      {key}
    </button>
  )
}

const Drum = ( { play, sounds, deactivateAudio} ) => {
  return sounds.map((sound) => <DrumKey play={play} sound={sound} deactivateAudio={deactivateAudio} />)
}

const DrumControl = ({switchSound, name}) => (
  <div className="controls flex flex-col gap-8 lg:border-4 rounded md:w-6/12 h-fll justify-center items-center text-6xl p-6">
    <h1 className="text-center text-5xl lg:text-6xl border-b-2 p-2 font-serif">Drum Machine</h1>
    <h2 id="display" className="text-center text-4xl lg:text-6xl">{name}</h2>
    <button onClick={switchSound} className="bg-red-600 active:bg-green-600 rounded-xl text-3xl p-2 shadow-lg">Switch</button>
  </div>
  )

function App() {
  const [soundName, setSoundName] = useState("")
  const [soundType, setSoundType] = useState("heaterKit")
  const [sounds, setSounds] = useState(soundsGroup[soundType])

  const styleActiveKey = (key) => {
    key.parentElement.style.backgroundColor = "#FFFF00"
  }

  const deactivateAudio = (audio) => {
    setTimeout(() => {
      audio.parentElement.style.backgroundColor = ""
    }, 350)
  }

  const play = (key, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(key)
    styleActiveKey(audio)
    audio.currentTime = 0;
    audio.play()
    deactivateAudio(audio)
  }

  const switchSound = () => {
    setSoundName("")
    if(soundType === "heaterKit"){
      setSoundType("smoothPianoKit")
      setSounds(soundsGroup.smoothPianoKit)
    } else {
      setSoundType("heaterKit")
      setSounds(soundsGroup.heaterKit)
    }
  }

  return (
    <div className="h-screen w-screen bg-black grid place-items-center">
      <div id="drum-machine" className="md:w-11/12 w-7/12 max-w-5xl flex flex-col md:flex-row justify-center items-center text-white lg:text-8xl md:text-6xl text-4xl border-4 p-6 gap-8 rounded bg-gradient-to-br from-cyan-500 to-blue-500">
        <div className="drumButtonsGrid grid grid-rows-3 grid-cols-3 gap-2">
          <Drum play={play} sounds={sounds} deactivateAudio={deactivateAudio}/>
        </div>
        <DrumControl switchSound={switchSound} name={soundName || soundsName[soundType]} />
      </div>
    </div>
  );
}

export default App;
