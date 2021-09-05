import React from 'react'
import styles from './AudioPlayer.module.scss'
import playIcon from '../../assets/icons/audioplayer/play.svg'
import pauseIcon from '../../assets/icons/audioplayer/pause.svg'
import infoIcon from '../../assets/icons/common/info.svg'
import downloadIcon from '../../assets/icons/audioplayer/download.svg'
import Image from 'next/image'
import { Slider } from 'antd';
import classNames from 'classnames'
import { timeFormatter, fromFileToUrl } from '../../utils/functions'
import { Modal } from 'antd'
import ModalWrapper from '../ModalWrapper'

export default function AudioPlayer({ songs }){
    const [isMounted, setIsMounted] = React.useState(false)
    const [lyrics, setLyrics] = React.useState({})
    const [modalVisible, setModalVisible] = React.useState(false)

    const [currentSong, setCurrentSong] = React.useState(songs[0])
    const [audio, setAudio] = React.useState(null)
    const [isAudioPlaying, setIsAudioPlaying] = React.useState(false)
    const [audioDuration, setAudioDuration] = React.useState(100)
    const [audioProgress, setAudioProgress] = React.useState(0)

    const initAudio = () => {
        setIsAudioPlaying(false)
        setAudioProgress(0)
        const audioObj = new Audio(fromFileToUrl(currentSong.audio.url))
        const canplaythroughHandler = () => { 
            setAudio(audioObj)
            setAudioDuration(Math.floor(audioObj.duration))  
            if(isMounted) {
                setIsAudioPlaying(true)
                return
            }
            setIsMounted(true)
        }

        const timeupdateHandler = () => { 
            setAudioProgress(audioObj.currentTime)
        }

        const endedHandler = () => { 
            setAudioProgress(0)
            audioObj.currentTime = 0
            setIsAudioPlaying(false)
        }

        audioObj.addEventListener('ended', endedHandler)    

        audioObj.addEventListener('timeupdate', timeupdateHandler)

        audioObj.addEventListener('canplaythrough', canplaythroughHandler)

        return () => { 
            audioObj.pause()
            audioObj.removeEventListener('timeupdate', timeupdateHandler) 
            audioObj.removeEventListener('ended', endedHandler)
            audioObj.removeEventListener('canplaythrough', canplaythroughHandler) 
        }
    }

    React.useEffect(initAudio, [currentSong])

    React.useEffect(() => {
        if(!audio) return
        if(isAudioPlaying)
            audio.play()
        else
            audio.pause()
    }, [isAudioPlaying, audio])

    const playBtnHandler = () => {
        setIsAudioPlaying(prev => !prev)
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    return (
        <div className={classNames(styles.audioPlayer)}>
            <div className={styles.audioPlayerHeader}>
                <h2 className={styles.audioPlayerSongName}><span className="accent bold">{currentSong.songAuthor}</span>{` - ${currentSong.songName}`}</h2>
                <div className={styles.audioPlayerControls}>
                    <button 
                        className={classNames(styles.playBtn, styles.playBtnBig)} 
                        onClick={playBtnHandler}
                    >
                         <Image src={isAudioPlaying ? pauseIcon.src : playIcon.src} width={15} height={15} alt="play button"/>
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
                                if(!audio) return
                                    audio.currentTime = value
                            }}
                        />
                    </div>
                    <div className={styles.audioPlayerTime}>
                        {timeFormatter(audioProgress)}/{timeFormatter(audioDuration)}
                    </div>
                </div>
            </div>

            <div className={styles.songsList}>
                {songs.map(song => (
                    <div key={song.id} className={styles.songItem}>
                        <button 
                            className={classNames(styles.playBtn)} 
                            onClick={() => {
                                if(song.id === currentSong.id){
                                    setIsAudioPlaying(!isAudioPlaying)
                                    return
                                }

                                setCurrentSong(songs.find(s => s.id === song.id))
                            }}>
                            <Image src={isAudioPlaying && song.id === currentSong.id ? pauseIcon.src : playIcon.src} width={10} height={10} alt="play button"/>
                        </button>
                        <h3 className={styles.songItemName}>
                            <span className="accent bold">{song.songAuthor}</span>{` - ${song.songName}`}
                        </h3>
                        <div className={styles.songItemBtns}>
                            <button 
                                className={styles.lyricsBtn}
                                onClick={() => {
                                    setLyrics({
                                        lyrics: song.lyrics,
                                        title: song.songAuthor,
                                        subtitile: song.songName
                                    })
                                    setModalVisible(true)
                                }}
                            >
                                <Image src={infoIcon.src} width={18} height={18} alt="info button"/>
                            </button>
                            <a href={fromFileToUrl(song.audio.url)} download target="_blank" rel="noreferrer">
                                <Image src={downloadIcon.src} width={18} height={18} alt="download button"/>
                            </a>
                        </div>
                    </div>
                ))}
            </div>  
            <Modal 
                width={380}
                visible={modalVisible}
                onCancel={handleCancel}
                modalRender={() => (
                    <ModalWrapper handleCancel={handleCancel}>
                        <h4 className={classNames("text accent bold", styles.lyricsTitle)}>{lyrics.title}</h4>
                        <h5 className={classNames("text bold", styles.lyricsSubtitle)}>{lyrics.subtitile}</h5>
                        <p className={classNames('text', styles.lyrics)} dangerouslySetInnerHTML={{ __html: lyrics.lyrics }}/>
                    </ModalWrapper>
                )}
            />
        </div>
    )
}