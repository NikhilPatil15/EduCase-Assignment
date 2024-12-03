import { SchoolModel } from "../models/School.model";
import { asyncHandler } from "../utils/asyncHandler";
import { Response } from "express";
import { ApiError } from "../utils/Error";
import { APIResponse } from "../utils/Response";
import { getDistance, orderByDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";

interface SchoolLocation {
  [key: string]: any;
  lat: number;
  lng: number;
}

const addSchool = asyncHandler(async (req: any, res: Response) => {
  try {
    const { name, address, longitude, latitude } = req.body;

    if (
      [name, address, longitude, latitude].some((item) => item.trim() === "")
    ) {
      throw new ApiError(401, "All fields are necessary!");
    }

    const parsedLongitude = parseFloat(longitude);
    const parsedLatitude = parseFloat(latitude);

    if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
      throw new ApiError(401, "Longitude and Latitude must be valid numbers!");
    }

    if (parsedLatitude < -90 || parsedLatitude > 90) {
      throw new ApiError(401, "Latitude must between -90 and 90 degrees!");
    }

    if (parsedLongitude < -180 || parsedLongitude > 180) {
      throw new ApiError(401, "Longitude must between -180 and 180 degrees!");
    }

    const School = await SchoolModel();

    const newSchool = await School.create({
      name: name.trim(),
      address: address.trim(),
      longitude: parsedLongitude,
      latitude: parsedLatitude,
    });

    if (!newSchool) {
      throw new ApiError(
        500,
        "Something went wrong while adding the school in database!"
      );
    }

    return res.json(
      new APIResponse(200, newSchool, "School added successfully!")
    );
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
});

const listSchool = asyncHandler(async (req: any, res: Response) => {
  try {
    const { latitude, longitude } = req.params;

    if (!latitude || !longitude) {
      throw new ApiError(401, "Both longitude and latitude are required!");
    }

    const parsedLongitude = parseFloat(longitude);
    const parsedLatitude = parseFloat(latitude);

    if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
      throw new ApiError(
        401,
        "Both longitude and latitude must be a valid number!"
      );
    }

    if (parsedLatitude < -90 || parsedLatitude > 90) {
      throw new ApiError(401, "Latitude must between -90 and 90 degrees!");
    }

    if (parsedLongitude < -180 || parsedLongitude > 180) {
      throw new ApiError(401, "Longitude must between -180 and 180 degrees!");
    }

    const School = await SchoolModel();

    const allSchools = await School.findAll();

    if (!allSchools || allSchools.length === 0) {
      throw new ApiError(404, "No schools found!");
    }

    const schoolLocations: SchoolLocation[] = allSchools.map((school: any) => ({
      ...school.toJSON(),
      latitude: school.latitude,
      longitude: school.longitude,
    }));

    const userCoords: GeolibInputCoordinates = {
      lat: parsedLatitude,
      lng: parsedLongitude,
    };

    /* Gets the difference between user co-ordinates and the school coords */
    const schoolWithDistances = schoolLocations.map((school) => {
      const schoolCoords: GeolibInputCoordinates = {
        lat: school.latitude,
        lng: school.longitude,
      };
      const distanceInMeters = getDistance(
        {
          lat: parsedLatitude,
          lng: parsedLongitude,
        },
        schoolCoords
      );

      return {
        ...school,
        distanceInKm: (distanceInMeters / 1000).toFixed(2),
      };
    });

    console.log("Schoool with distances:", schoolWithDistances);

    /* OrderByDistance function sorts the schools by distance */
    const sortedSchools = orderByDistance(userCoords, schoolWithDistances);

    console.log("Sorted Schools: ", sortedSchools);

    return res.json(
      new APIResponse(200, sortedSchools, "Schools listed successfully!")
    );
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
});

export { addSchool, listSchool };
