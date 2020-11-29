const fs = require("fs");

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers.js");

const { zookeepers } = require("../data/zookeepers.json");

// mock fs so testing doesn't send new zookeepers to zookeeper api
jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Calista", id: "h5e6l5l6o" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Calista");
    expect(zookeeper.id).toBe("h5e6l5l6o");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "1",
            name: "Calista",
            favoriteAnimal: "deer"
        },
        {
            id: "2",
            name: "Donald",
            favoriteAnimal: "rat"
        }
    ];

    const updatedZookeepers = filterByQuery({ favoriteAnimal: "rat" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "1",
            name: "Calista",
            favoriteAnimal: "deer"
        },
        {
            id: "2",
            name: "Donald",
            favoriteAnimal: "rat"
        }
    ];

    const result = findById("1", startingZookeepers);
    
    expect(result.name).toBe("Calista");
});

test("validates favorite animal", () => {
    const zookeeper = {
        id: "1",
        name: "Calista",
        age: 26,
        favoriteAnimal: "deer"
    };

    const invalidZookeeper = {
        id: "1",
        name: "Calista"
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});