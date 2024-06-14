"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Card, CardContent, CardMedia, CircularProgress, IconButton } from '@mui/material';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

async function fetchUserAssets() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/users-assets`;
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
    const response = await axios.get(url, config);
    return response.data;
}

interface UserAsset {
    pseudo: string;
    firstName: string;
    lastName: string;
    dollarAvailables: number;
    UserHasCrypto: {
        Crypto: {
            id: string;
            name: string;
            image: string;
            value: number;
        };
        amount: number;
    }[];
}
/**
 * Renders the UserAssets component, which displays the user's assets and exchange history.
 *
 * @return {ReactElement} The rendered UserAssets component.
 */
const UserAssets: React.FC = () => {
    const [userAssets, setUserAssets] = useState<UserAsset[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);
    const [showSlider, setShowSlider] = useState<boolean>(false);
        /**
         * A function to fetch user assets asynchronously.
         *
         * @return {Promise<void>} Promise that resolves once user assets are fetched
         */
    useEffect(() => {
        const getUserAssets = async () => {
            try {
                const data = await fetchUserAssets();
                setUserAssets(data);
            } catch (error) {
                setError('Failed to fetch user assets');
            } finally {
                setLoading(false);
            }
        };
        getUserAssets();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Box sx={{ textAlign: 'center', mt: 4 }}>{error}</Box>;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: (
            <IconButton sx={{ zIndex: 1000, color: 'black' }}>
                <ArrowForwardIos />
            </IconButton>
        ),
        prevArrow: (
            <IconButton sx={{ zIndex: 1000, color: 'black' }}>
                <ArrowBackIos />
            </IconButton>
        ),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
             User's Assets👇
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setShowSlider(!showSlider)}>
                {showSlider ? 'Hide User Assets' : 'Show User Assets'}
            </Button>
            {showSlider && (
                <Box mt={4}>
                    <Slider {...sliderSettings}>
                        {userAssets.map((user) => (
                            <Box key={user.pseudo} p={2}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {user.pseudo}
                                        </Typography>
                                        <Typography variant="body2">
                                            {user.firstName} {user.lastName}
                                        </Typography>
                                        <Typography variant="body2">
                                            Dollar Available: ${user.dollarAvailables.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                                        {user.UserHasCrypto.map((crypto) => (
                                            <Card key={crypto.Crypto.id} sx={{ mb: 2, width: '100%' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="100"
                                                    image={crypto.Crypto.image}
                                                    alt={crypto.Crypto.name}
                                                />
                                                <CardContent>
                                                    <Typography variant="h6">{crypto.Crypto.name}</Typography>
                                                    <Typography variant="body2">
                                                        Quantity: {crypto.amount}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Value: ${crypto.Crypto.value.toFixed(2)}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Box>
                                </Card>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            )}
              <Typography variant="h4" gutterBottom>
               Exchange History📈
            </Typography>
            
        </Container>
        
    );
};

export default UserAssets;
