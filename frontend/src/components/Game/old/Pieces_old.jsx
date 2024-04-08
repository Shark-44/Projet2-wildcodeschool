import { useEffect, useState } from "react";
import styled from "styled-components";

function Piece() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // const windowHeight = window.innerHeight;
      const maxGroupCount = Math.floor(windowWidth / 140); // Maximum number of groups based on window width
      const groupCount = Math.min(maxGroupCount, 5); // Limiting the group count to a maximum of 5
      const totalPieces = 70;

      const newGroups = [];

      let remainingPieces = totalPieces;

      for (let i = 0; i < groupCount; i += 1) {
        const maxPiecesInGroup = Math.min(remainingPieces, 5); // Maximum number of pieces that can be in a group
        const pieceCount = Math.floor(Math.random() * maxPiecesInGroup) + 1; // Random number of pieces in the group

        const groupLeft = i * (maxPiecesInGroup * 50 + 30) + 250; // Left position of the group with 50px offset
        const groupTop = i % 2 === 0 ? "80%" : "95%"; // Alternating top positions

        const groupPieces = Array.from(
          { length: pieceCount },
          (_, pieceIndex) => ({
            id: `${i}-${pieceIndex}`,
            top: groupTop,
            left: groupLeft + pieceIndex * 60, // 50px for piece width + 10px for space
          })
        );

        newGroups.push(groupPieces);
        remainingPieces -= pieceCount;

        if (remainingPieces <= 0) break;
      }

      setGroups(newGroups);
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <PieceContainer>
      {groups.map((group) => (
        <Group key={group[0].id}>
          {group.map((piece) => (
            <PieceStyle
              key={piece.id}
              style={{ top: piece.top, left: piece.left }}
              height={50}
              width={50}
            />
          ))}
        </Group>
      ))}
    </PieceContainer>
  );
}

export default Piece;

const PieceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Group = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const PieceStyle = styled.div`
  position: absolute;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: blue;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;
