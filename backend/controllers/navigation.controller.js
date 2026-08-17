import { getNavigationService } from "../services/navigation.service.js";

export const getNavigation = async (req, res) => {
  try {
    const data = await getNavigationService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};