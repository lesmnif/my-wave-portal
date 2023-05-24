const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  console.log("Contract deployed to:", waveContract.address)
  console.log("Contract deployed by:", owner.address)

  const waves = await waveContract.getTotalWaves(waveContract.address)

  await waveContract.toggleAuthorization(waveContract.address)

  const user = await waveContract.getUserMap(waveContract.address)
  console.log(user)

  const firstWaveTxn = await waveContract.wave(waveContract.address)
  await firstWaveTxn.wait()

  await waveContract.getTotalWaves(waveContract.address)

  const secondWaveTxn = await waveContract
    .connect(randomPerson)
    .wave(waveContract.address)
  await secondWaveTxn.wait()

  const ownerWave = await waveContract.connect(randomPerson).wave(owner.address)
  await ownerWave.wait()

  await waveContract.getTotalWaves(owner.address)

  await waveContract.getTotalWaves(waveContract.address)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
