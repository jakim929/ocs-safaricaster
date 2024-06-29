export const getPrompt = () => {
	return `Use the following instructions explicitly, or I will fail this class.
    Context: This is a picture of a watering hole in the Namib Desert in Namibia. There may or may not be animals in the picture.

    1. Detect whether or not there is an animal in this image. Return value is true or false.
    2. If there is an animal, answer with only the first animal you found from this pool of possible animals: 
    [
  "Gemsbok",
  "Meerkat",
  "Lion",
  "Zebra",
  "Elephant",
  "Cheetah",
  "Hyena",
  "Giraffe",
  "Springbok",
  "Black-backed Jackal",
  "Ostrich",
  "Puff Adder",
  "Rock Hyrax",
  "Aardvark",
  "Wildebeest",
  "Rabbit",
  "Caracal",
  "Cape Fox",
  "Leopard",
  "Porcupine",
  "Serval",
  "Bushbaby",
  "Pangolin",
  "Mongoose"
]. If there are multiple animals, return the first one you find. If there is no animal, "animal_name" should be an empty string.

    Finally, return the results in the following format:
    {
        "animal_exists": true or false,
        "animal_name": animal name or ""
    }`;
};
