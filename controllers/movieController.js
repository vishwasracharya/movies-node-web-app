/* Models */
const Movies = require('../models/movies');
const Users = require('../models/users');

/* POST Methods */
const addMovies = async (req, res) => {
    try {
        const data = req.body;
        const movie = new Movies(data);
        await movie.save();
        res.redirect(200, process.env.SITE_URL);
    } catch (error) {
        console.log(error);
    }
};

const editMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const newdata = {
            title: data.title,
            genre: data.genre,
            director: data.director,
            year: data.year,
            rating: data.rating,
            image: data.image,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            updated_at: Date.now()
        };
        await Movies.findByIdAndUpdate(id, newdata);
        res.redirect(200, `${process.env.SITE_URL}/movies/${id}`);
    } catch (error) {
        console.log(error);
    }
}

const rentMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const uid = req.params.uid;
        const movie = await Movies.findById(id);
        if (movie) {
            const data = req.body;
            if (movie.quantity > 0) {
                const user = await Users.findById(uid);
                user.movies.push(movie._id);
                await user.save();
                movie.quantity = movie.quantity - 1;
                await movie.save();
                res.status(200).send("Movie Rented Successfully");
                return;
            }
            res.status(400).send("Movie Not Available");
        } else {
            res.status(404).send("Movie Not Found");
        }
    } catch (error) {
        console.log(error);
    }
};

const returnMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const uid = req.params.uid;
        const movie = await Movies.findById(id);
        if (movie) {
            await Users.findOneAndUpdate({ _id: uid }, { $pull: { movies: movie._id } });
            movie.quantity = movie.quantity + 1;
            await movie.save();
            res.status(200).send("Movie Returned Successfully");
        } else {
            res.status(404).send("Movie Not Found");
        }
    } catch (error) {
        console.log(error);
    }
}

/* DELETE Methods */
const deleteMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        await Movies.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: "Movie Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
    }
};

/* GET Methods */
const getAllMovies = async (req, res) => {
    try {
        let movies = await Movies.find();
        movies = movies.map(movie => {
            return {
                _id: movie._id,
                title: movie.title,
                genre: movie.genre,
                director: movie.director,
                year: movie.year,
                rating: movie.rating,
                image: movie.image,
                description: movie.description,
                created_at: movie.created_at,
                updated_at: movie.updated_at
            }
        });
        return movies;
    } catch (error) {
        console.log(error);
    }
}

const getMovieById = async (id) => {
    try {
        let movie = await Movies.findById(id);
        if (movie) {
            return movie;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.addMovies = addMovies;
module.exports.getAllMovies = getAllMovies;
module.exports.getMovieById = getMovieById;
module.exports.editMovieById = editMovieById;
module.exports.rentMovieById = rentMovieById;
module.exports.returnMovieById = returnMovieById;
module.exports.deleteMovieById = deleteMovieById;