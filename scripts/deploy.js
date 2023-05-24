const main = async () => {
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance()

  console.log("Deploying contracts with account: ", deployer.address)
  console.log("Account balance: ", accountBalance.toString())

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  console.log("WavePortal address: ", waveContract.address)

  await waveContract.toggleAuthorization(waveContract.address)

  const firstWaveTxn = await waveContract.wave(waveContract.address)
  await firstWaveTxn.wait()

  const user = await waveContract.getUserMap(waveContract.address)
  console.log(`The user with this adress "${waveContract.address} has this number of waves: ${user.number}. And has this status on the authorization: ${user.isAuthorized}`)
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
