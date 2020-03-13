<?php

    namespace App\DataFixtures;

    use App\Entity\Customer;
    use App\Entity\Invoice;
    use App\Entity\User;
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Persistence\ObjectManager;
    use Faker\Factory;
    use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


    class AppFixtures extends Fixture
    {
        /** encoder pwd
         * @var UserPasswordEncoderInterface
         */
        private $encoder;

        public function __construct(UserPasswordEncoderInterface $encoder)
        {
            $this->encoder = $encoder;
        }

        public function load(ObjectManager $manager)
        {
            $faker = Factory::create('nb_NO');
            for ($u = 0; $u < 25; $u++) {
                $user = new User();
                $chrono = 1;

                $hash = $this->encoder->encodePassword( $user, 'lol' );
                $user->setFirstName($faker->firstName())
                     ->setLastName($faker->lastName)
                     ->setEmail($faker->email)
                     ->setPassword($hash);

                $manager->persist($user);
                for ($c = 0, $cMax = mt_rand ( 5, 40 ); $c < $cMax; $c++) {
                        $customer = new Customer();
                        $customer -> setFirstName ( $faker -> firstName () )
                                  -> setLastName ( $faker -> lastName )
                                  -> setCompany ( $faker -> company )
                                  -> setEmail ( $faker -> email )
                                  -> setUser ( $user );
                        $manager -> persist ( $customer );

                    for ($i = 0, $iMax = mt_rand ( 5, 40 ); $i < $iMax; $i++) {
                            $invoice = new Invoice();
                            $invoice -> setAmount ( $faker -> randomFloat ( 2, 250, 20000 ) )
                                     -> setSentAt ( $faker -> dateTimeBetween ( '-6months' ) )
                                     -> setStatus (
                                         $faker -> randomElement (
                                             [
                                                 'SENT',
                                                 'PAID',
                                                 'CANCELLED'
                                             ] ) )
                                     -> setCustomer ( $customer )
                                     -> setChrono ( $chrono );
                            $chrono ++;
                            $manager -> persist ( $invoice );
                        }
                    }
                }
            $manager->flush();
        }
    }
