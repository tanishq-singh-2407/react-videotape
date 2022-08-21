import { Player } from 'react-videotape';

const Home = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <main>
                <Player
                    videos={['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4']}
                    rate={2}
                    skip={{
                        last: 0,
                        start: 10
                    }}
                />
            </main>
        </div>
    )
}

export default Home;