import './ScanlineOverlay.css';

export default function ScanlineOverlay() {
    return (
        <div className="scanline-overlay">
            <div className="scanline"></div>
            <div className="screen-flicker"></div>
        </div>
    );
}
