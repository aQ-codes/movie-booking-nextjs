import { updateScreen } from "../repositories/putScreenRepository.js";

// Controller to update a screen
export const updateScreenController = async (req, res) => {
    try {
        const { screenId } = req.params;
        const screenData = req.body;
        screenData.seatArrangement = screenData.seatArrangement.replace(/\s+/g, '');
        const updatedScreen = await updateScreen(screenId, screenData);
        if (!updatedScreen) {
        return res.status(404).json({ message: "Screen not found" });
        }
        res.status(200).json(updatedScreen); // Send updated screen data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
