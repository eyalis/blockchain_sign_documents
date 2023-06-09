import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CardItem = ({ image, title, description, to }) => {
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <Card sx={{ ...styles.card, ...styles.hover }}>
                <CardMedia component="img" image={image} height="250" />
                <CardContent sx={styles.cardContent}>
                    <div style={styles.contentContainer}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

const styles = {
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    hover: {
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        },
    },
    cardContent: {
        height: '100%',
    },
    contentContainer: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gap: '8px',
        height: '100%',
    },
};

export default CardItem;
