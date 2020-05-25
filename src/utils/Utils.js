const octaves = [1, 2, 3, 4, 5, 6, 7];
const tones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const AllNotes = octaves.reduce((notes, octave)=> {
    const octaveNotes = tones.map(tone => `${tone}${octave}`);
    return [...notes, ...octaveNotes];
}, []);

export default (startKey, endKey) => {
    return AllNotes.slice(AllNotes.indexOf(startKey), AllNotes.indexOf(endKey) + 1);
}