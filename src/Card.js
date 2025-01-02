import React from 'react';

const Card = ({ track }) => {
  const getDownloadFilename = () => {
    const trackName = track.album.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const artistName = track.artists[0].name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `${trackName}_${artistName}.mp3`;
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="card h-100">
        <img src={track.album.images[0].url} className="card-img-top" alt="music thumbnail" />
        <div className="card-body">
          <h5 className="card-title">Name: {track.album.name}</h5>
          <p className="card-text">Artist: {track.artists[0].name}</p>
          <p className="card-text">Release-Date: {track.album.release_date}</p>
          {track.preview_url ? (
            <div className="audio-container">
              <audio 
                src={track.preview_url} 
                controls 
                className="audio-preview w-100" 
                type="audio/mpeg"
              />
              <a 
                href={track.preview_url}
                download={getDownloadFilename()}
                className="btn btn-primary mt-2"
              >
                Download
              </a>
            </div>
          ) : (
            <p>Preview not available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
