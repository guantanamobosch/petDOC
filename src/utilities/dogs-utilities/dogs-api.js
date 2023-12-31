import { json } from 'react-router-dom'
import sendRequest from '../send-request'
const breedListUrl = 'https://dog.ceo/api/breeds/list/all'
const BASE_URL = '/api/pets'

export async function getBreedList() {
    console.log(
        "📍 getBreedList() func called from src/utilities/dogs-utilities/dogs-api"
    );
    const breedsObjectRequest = await sendRequest("/api/dogs/get-breed-list");
    const breedsObject = breedsObjectRequest.message;
    // console.log(breedsObject);
    const breedList = [];

    Object.keys(breedsObject).forEach(function (key, index) {
        if (key === "australian") {
            breedList.push("Australian Shepherd");
        } else if (key === "mexicanhairless") {
            breedList.push("Mexican Hairless");
        } else if (key === "germanshepherd") {
            breedList.push("German Shepherd");
        } else if (key === "finnish") {
            breedList.push("Finnish Lapphund");
        } else if (breedsObject[key].length === 0) {
            let capitalizedName = key.charAt(0).toUpperCase() + key.slice(1);
            breedList.push(capitalizedName);
        } else {
            let capitalizedLastName =
                key.charAt(0).toUpperCase() + key.slice(1);
            for (let i = 0; i < breedsObject[key].length; i++) {
                const joinedBreedName =
                    breedsObject[key][i].charAt(0).toUpperCase() +
                    breedsObject[key][i].slice(1) +
                    " " +
                    capitalizedLastName;
                breedList.push(joinedBreedName);
            }
        }
    });

    // console.log(breedList);

    return breedList.sort();
}

export async function getBreedPhoto(breedName) {
    console.log(
        "📍 getBreedPhoto func called from src/utilities/dogs-utilities/dogs-api"
    );

    const breedPhotoRequest = await sendRequest(
        "/api/dogs/get-breed-photo",
        "POST",
        { name: breedName }
    );
    const breedPhoto = breedPhotoRequest.message;
    return breedPhoto;
}

// create pet
export function createPet(petData) {
  return sendRequest(BASE_URL, 'POST', petData)
}

// index all pets
export function indexPets() {
  return sendRequest(BASE_URL, 'GET')
}

// find specific pet by id
export function findPetById(petId) {
  return sendRequest(BASE_URL + `/${petId}`, 'GET')
}

// update pet info
export function updatePet(petId, petData) {
  return sendRequest(BASE_URL + `/update/${petId}`, 'PATCH', petData)
}

// delete pet
export function deletePet(petId) {
  return sendRequest(BASE_URL + `/${petId}`, 'DELETE')
}
