export const AfricanPatternCircle = ({
    patternSrc,
    position = 'left',
    size = 500,
    opacity = 0.25
}) => {
    const isLeft = position === 'left';

    return (
        <div
            style={{
                position: 'absolute',
                [isLeft ? 'left' : 'right']: `-${size / 2}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: opacity,
                filter: `brightness(0) saturate(100%) invert(72%) sepia(38%) saturate(467%) hue-rotate(358deg) brightness(90%) contrast(87%)`
            }}
        >
            <img
                src={patternSrc}
                alt=""
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
        </div>
    );
};