import { db } from "~/server/db";

async function testFindManyRelatedInclude() {
    const kostums = await db.kostum.findMany({
        where: {
            rvalues: {
                some: {
                    user_id: 3,
                }
            }
        },
        include: {
            rvalues: {
                include: {
                    subkriteria: {
                        include: {
                            kriteria: true,
                        }
                    }
                }
            },
        },
    });
    console.log(kostums);
    console.log("===== ========== ========== ========== ========== =====")
    console.log(kostums[2]);
    console.log("===== ==========")
    console.log((await db.kostum.findMany({
        where: {
            rvalues: {
                some: {
                    kostum_id: kostums[2]!.id,
                    user_id: 3,
                }
            }
        },
        include: {
            rvalues: {
                include: {
                    subkriteria: {
                        include: {
                            kriteria: true,
                        }
                    }
                }
            },
        },
    }))[0]);
    console.log("===== ========== ========== ========== ========== =====")
    console.log(kostums[2]!.rvalues[1]);
    console.log("===== ==========")
    console.log((await db.kostum.findMany({
        where: {
            rvalues: {
                some: {
                    kostum_id: kostums[2]!.id,
                    subkriteria: {
                        kriteria_id: kostums[2]!.rvalues[1]!.subkriteria.kriteria_id,
                    },
                    user_id: 3,
                }
            }
        },
        include: {
            rvalues: {
                include: {
                    subkriteria: {
                        include: {
                            kriteria: true,
                        }
                    }
                }
            },
        },
    })));
    console.log("===== ========== ========== ========== ========== =====")
    console.log("===== ========== ========== ========== ========== =====")
    console.log((await db.kostum.findMany({
        where: {
            rvalues: {
                some: {
                    subkriteria: {
                        kriteria_id: kostums[2]!.rvalues[1]!.subkriteria.kriteria_id,
                    },
                    user_id: 3,
                }
            }
        },
        include: {
            rvalues: {
                include: {
                    subkriteria: {
                        include: {
                            kriteria: true,
                        }
                    }
                }
            },
        },
    })));
}

void testFindManyRelatedInclude();