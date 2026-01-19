import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-12-15.clover', // API version matching installed Stripe SDK
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { items } = req.body;

            if (!items || items.length === 0) {
                return res.status(400).json({ error: 'No items in cart' });
            }

            // Format line items for Stripe
            const lineItems = items.map((item) => ({
                price_data: {
                    currency: 'gbp', // Adjust currency as needed (e.g., usd, gbp, eur)
                    product_data: {
                        name: item.name,
                        images: item.image
                            ? [item.image.startsWith('http') ? item.image : `${req.headers.origin}${item.image}`]
                            : [],
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents/pence
                },
                quantity: item.quantity,
            }));

            // Create Checkout Session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${req.headers.origin}/checkout/thank-you`, // Redirect to thank-you page
                cancel_url: `${req.headers.origin}/cart`, // Redirect back to cart on cancel
                automatic_tax: { enabled: false }, // Disable tax for now as per instructions
            });

            res.status(200).json({ sessionId: session.id, url: session.url });
        } catch (err) {
            console.error('Stripe Checkout Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
