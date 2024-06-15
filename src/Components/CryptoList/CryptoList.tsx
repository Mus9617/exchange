"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, CircularProgress, Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import CryptoHistory from '@/Components/History/History';
import "../../../public/Research.css"
import Slider from 'react-slick';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Crypto } from '../../Services/cryptoList';


/**
 * Renders a list of cryptocurrencies with the ability to show and hide them.
 * Also allows the user to view the history of a selected cryptocurrency.
 *
 * @return {ReactElement} The rendered cryptocurrency list
 */


const CryptoList: React.FC = () => {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);
    const [showCryptos, setShowCryptos] = useState<boolean>(false);
    const [selectedCryptoId, setSelectedCryptoId] = useState<string | null>(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${process.env.NEXT_PUBLIC_API_URL}/crypto/all`;
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        'Authorization': `Bearer ${token}`,
                    },
                };
                const response = await axios.get(url, config);
                setCryptos(response.data);
            } catch (err) {
                setError('Failed to fetch cryptos');
            } finally {
                setLoading(false);
            }
        };
        fetchCryptos();
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1, 
        responsive: [
            {
              breakpoint: 1024, 
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 600, 
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
        ]
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 2, mb: 2, textAlign: 'center' }} className='micro'>
            
            <Button variant="contained" onClick={() => setShowCryptos(!showCryptos)}>
                {showCryptos ? 'Hide Cryptos' : 'Show Cryptos'}
            </Button>

            {showCryptos && (
                <Slider {...settings} className='crypto-slider'> 
                    {cryptos.map((crypto) => (
                        <div key={crypto.id} className='crypto-card'> 
                            <Card sx={{ mb: 4, width: '100%', maxWidth: '400px' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={crypto.image}
                                    alt={crypto.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{crypto.name}</Typography>
                                    <Typography variant="body2">Value: ${crypto.value.toFixed(2)}</Typography>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        onClick={() => setSelectedCryptoId(crypto.id)}
                                    >
                                        Show History
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </Slider>
            )}

            {selectedCryptoId && <CryptoHistory cryptoId={selectedCryptoId} />}
        </Container>
    );
};

export default CryptoList;