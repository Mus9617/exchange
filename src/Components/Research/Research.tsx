"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Box, Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";

interface Crypto {
    id: string;
    name: string;
    value: number;
    image: string;
}
/**
 * Renders a page for creating and managing promo codes.
 *
 * @return {ReactElement} The rendered promo code page.
 */
const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Crypto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (searchQuery === "") {
            setSearchResults([]);
            setError(null);
        }
    }, [searchQuery]);

    /**
     * Handles the search functionality by sending a request to the API based on the search query.
     *
     * @return {Promise<void>} Sets search results based on the API response or error message in case of failure.
     */
    const handleSearch = async () => {
        if (searchQuery === "") {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const url = `${process.env.NEXT_PUBLIC_API_URL}/crypto/search/${searchQuery}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.get(url, config);
            setSearchResults(response.data);
        } catch (err) {
            setError("Failed to fetch search results");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <TextField
                    label="Search for a cryptocurrency"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ mr: 2, width: '300px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && <Box sx={{ textAlign: 'center', mt: 4 }}>{error}</Box>}
            <Box mt={4} display="flex" flexWrap="wrap" justifyContent="center">
                {searchResults.map((crypto) => (
                    <Card key={crypto.id} sx={{ m: 2, width: 200 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={crypto.image}
                            alt={crypto.name}
                        />
                        <CardContent>
                            <Typography variant="h6">{crypto.name}</Typography>
                            <Typography variant="h6">💲{crypto.value}$</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default SearchBar;
