import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CardItem = ({ image, title, description, to }) => {
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <Card sx={styles.card} onClick={() => { }}>
                <CardMedia component="img" image={image} height="250" />
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
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
};

export default CardItem;
