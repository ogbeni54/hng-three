import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { signOut } from 'firebase/auth'; // Import 'signOut' from Firebase auth
import { auth } from '../firebase/Config';
import "./grid.css";

const Grid = () => {
  const [images, setImages] = useState([
    { id: 1, src: "./Assets/rr.jpg", tag: "First" },
    { id: 2, src: "./Assets/ff.jpg", tag: "Second" },
    { id: 3, src: "./Assets/Buloy Springs.jpg", tag: "Third" },
    { id: 4, src: "./Assets/Calagus Islands.jpg", tag: "Fourth" },
    { id: 5, src: "./Assets/Latik Riverside.jpg", tag: "Fifth" },
    { id: 6, src: "./Assets/tt.jpg", tag: "Sixth" },
    { id: 7, src: "./Assets/cc.jpg", tag: "Seventh" },
    { id: 8, src: "./Assets/Seven Sisters Waterfall.jpg", tag: "Eight" },
    { id: 9, src: "./Assets/zz.jpg", tag: "Nine" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = [...images];
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);
    setImages(reorderedImages);
  };
  
  const filteredImages = images.filter((image) =>
    image.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log the user out using Firebase
      navigate('/'); // Redirect the user to the home page or any other route
    } catch (error) {
      console.error('Logout error:', error.code, error.message);
    }
  };


  return (
    <div className="mainet">
      <div className="major1">
        <div className="mesh">
        <h1 className="heady"><Link to='/'>HNG Task Three</Link></h1>
       
       <div className="search-container">
         <input
           type="text"
           placeholder="Search by tag..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
       </div>
        </div>
        
        
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="characters" direction="both">
            {(provided) => (
              <div
                className="conty characters"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredImages.map((image, index) => (
                  <Draggable
                    key={image.id.toString()}
                    draggableId={image.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="img"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img src={image.src} alt={image.tag} />
                        <p className="tag">{image.tag}</p>
                      </div>
                      
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button onClick={handleLogout} className="logout">Logout</button>
      </div>
    </div>
  );
};

export default Grid;