

export const routeAnimation = {
    atEnter: {
        opacity: 0,
        translateX: -100
    },
    atLeave: {
        opacity: 0,
        translateX: 100
    },
    atActive: {
        opacity: 1,
        translateX: 0
    }
}


export const mapStyles = (styles: any) => {
    return {
        opacity: styles.opacity,
        transform: `translateX(${styles.translateX}px)`,
    };
}