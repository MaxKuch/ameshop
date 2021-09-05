import React from 'react'

import styles from './AudioPlayer.module.scss'
import playIcon from '../../assets/icons/audioplayer/play.svg'
import pauseIcon from '../../assets/icons/audioplayer/pause.svg'
import downloadIcon from '../../assets/icons/audioplayer/download.svg'
import Image from 'next/image'
import { Slider } from 'antd';
import classNames from 'classnames'
import {AudioContext} from './AudioContext'
import { timeFormatter } from '../../utils/functions'

export default function AudioPlayerMini({ big, src }){
    
    const {audio, setAudio} = React.useContext(AudioContext)

    const [localAudio, setLocalAudio] = React.useState(null)
    const [isAudioPlaying, setIsAudioPlaying] = React.useState(false)
    const [audioDuration, setAudioDuration] = React.useState(100)
    const [audioProgress, setAudioProgress] = React.useState(0)

    React.useEffect(() => {
        const audioObj = new Audio(src)
        const canplaythroughHandler = () => { 
            setLocalAudio(audioObj)
            setAudioDuration(Math.floor(audioObj.duration))
        }
        
        audioObj.addEventListener('canplaythrough', canplaythroughHandler)
        
        return () => { 
            audioObj.removeEventListener('canplaythrough', canplaythroughHandler) 
        }
    }, [src])

    React.useEffect(() => {
        if(setAudio && localAudio && isAudioPlaying && localAudio.src !== audio) {
            setIsAudioPlaying(false)
        }
    }, [setAudio, isAudioPlaying, localAudio, audio])

    React.useEffect(() => {
        if(!localAudio) return
        const timeupdateHandler = () => { 
            setAudioProgress(localAudio.currentTime)
        }
        const endedHandler = () => { 
            setAudioProgress(0)
            localAudio.currentTime = 0
            setIsAudioPlaying(false)
        }
        localAudio.addEventListener('timeupdate', timeupdateHandler)
        localAudio.addEventListener('ended', endedHandler)
        return () => { 
            localAudio.pause()
            localAudio.removeEventListener('timeupdate', timeupdateHandler) 
            localAudio.removeEventListener('ended', endedHandler)
        }

    }, [localAudio])

    React.useEffect(() => {
        if(!localAudio) return

        if(isAudioPlaying)
            localAudio.play()
        else
            localAudio.pause()
    }, [isAudioPlaying, localAudio])

    const playBtnHandler = () => {
        if(!localAudio) return
        if(setAudio && localAudio.src !== audio) {
            setAudio(localAudio.src)
            setIsAudioPlaying(true)
            return
        }      
        setIsAudioPlaying(prev => !prev)
    }

    return (
        <div className={classNames(styles.audioPlayerMini, big ? styles.audioPlayerMiniBig : '')}>
            <button 
                className={classNames(styles.playBtn, big ? styles.playBtnBig  : "")}
                onClick={playBtnHandler}
            >
                <Image src={isAudioPlaying ? pauseIcon.src : playIcon.src} width={big ? 15 : 10} height={big ? 15 : 10} alt="play button"/>
            </button>
            <div className={styles.slider}>
                <Slider 
                    min={0}
                    max={audioDuration} 
                    value={audioProgress} 
                    defaultValue={0} 
                    tipFormatter={timeFormatter}
                    disabled={false} 
                    onChange={value => {
                        localAudio.currentTime = value
                    }}
                />
            </div>
            <a href={src} download target="_blank" rel="noreferrer"><Image src={downloadIcon.src} width={big ? 16 : 12} height={big ? 16 : 12} alt="download button"/></a>
        </div>
    )
}