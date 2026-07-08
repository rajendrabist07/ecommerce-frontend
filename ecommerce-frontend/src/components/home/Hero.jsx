const Hero = () => {
    return (
        <section className="bg-gray-100">

            <div className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid md:grid-cols-2 gap-10 items-center">

                    {/* Left */}

                    <div>

                        <h1 className="text-5xl font-bold leading-tight">

                            Shop Smarter

                            <span className="text-indigo-600">

                                {" "}Every Day

                            </span>

                        </h1>

                        <p className="text-gray-600 mt-6">

                            Discover premium products with
                            fast delivery and secure payment.

                        </p>

                        <button
                            className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Shop Now
                        </button>

                    </div>

                    {/* Right */}

                    <div>

                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
                            alt="Hero"
                            className="rounded-xl shadow-lg"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;