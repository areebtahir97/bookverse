import db from "../configs/db.js"

export const addToLibrary=async(req,res)=>{
    try {
        console.log("User ID:", req.userId);
        console.log("Body:", req.body);
        const userId=req.userId     //from auth middleware
        const {bookId,title,author,coverUrl}=req.body

        if (!bookId || !title){
            return res.status(400).json({message:"Book data is required"})
        }

        const result =await db.query(
            `INSERT INTO user_books (user_id, book_id, title, author, cover_url)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (user_id, book_id) DO NOTHING
            RETURNING *`,
            [userId, bookId, title, author, coverUrl]
        )

        if (result.rows.length===0){
            return res.status(409).json({message:"Book already in library"}) 
        }
        res.status(201).json({
            message:"Book added to library",
            book:result.rows[0],
        })
    } catch (error) {
        console.error("Add to library error:", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

//my library shows all the books of the user
export const getMyLibrary = async(req,res)=>{
    try {
        const userId=req.userId

        const result= await db.query(
            `SELECT id,book_id,title,author,cover_url,added_at FROM user_books WHERE user_id=$1 ORDER BY added_at DESC`,
            [userId]
        )

        res.json({books:result.rows});
    } catch (error) {
        console.error("Get library error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//remove from library api
export const removeFromLibrary=async(req,res)=>{
    try {
        const userId=req.userId
        const {bookId}=req.params

        await db.query("DELETE FROM user_books WHERE user_id=$1 AND book_id=$2",[userId,bookId])
        res.json({message:"Book removed from library"})

    } catch (error) {
        console.error("Remove error:", err);
        res.status(500).json({ message: "Internal server error" });
    }

}