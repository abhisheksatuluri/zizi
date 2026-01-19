import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const port = 4242;

// Parse JSON bodies
app.use(express.json());

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-12-15.clover',
});

// Checkout Session Endpoint
app.post('/api/checkout/session', async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in cart' });
        }

        console.log('Creating checkout session for:', items.length, 'items');

        const lineItems = items.map((item) => ({
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: item.name,
                    // Stripe requires absolute URLs. If image is local (relative), don't send it.
                    images: item.image && item.image.startsWith('http') ? [item.image] : [],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Use a hardcoded origin for local testing if req.headers.origin is missing or localhost
        // In production/vercel this comes from the request, but for local dev with proxy, 
        // the origin might be localhost:3000 which is what we want.
        const origin = req.headers.origin || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/checkout/thank-you`,
            cancel_url: `${origin}/cart`,
            automatic_tax: { enabled: false },
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (err) {
        console.error('Stripe Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Local API server running at http://localhost:${port}`);
});
