import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:get/get.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import '../../../widgets/dev_icons_list.dart';
import '../controllers/about_me_controller.dart';
import 'package:google_fonts/google_fonts.dart';

class AboutMeView extends GetView<AboutMeController> {
  const AboutMeView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              gretting,
              name,
              title,
              presentation,
              DevIconsList(
                iconList: controller.softwareTechnologies,
              ),
            ],
          ),
        ),
        Expanded(
          flex: 7,
          child: LottieBuilder.network(
            'https://lottie.host/afb234a8-a244-45e5-ae62-87f71489a5f5/4QvEx2vt3I.json',
            alignment: Alignment.centerRight,
          ),
        ),
      ],
    );
  }

  Text get presentation {
    return Text(
      controller.presentation,
      style: const TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.bold,
      ),
      textAlign: TextAlign.start,
    );
  }

  Text get title {
    return Text(
      controller.title,
      style: const TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      textAlign: TextAlign.start,
    );
  }

  Text get name {
    return Text(
      controller.name,
      style: const TextStyle(
        fontSize: 30,
        fontWeight: FontWeight.bold,
      ),
      textAlign: TextAlign.start,
    );
  }

  AnimatedTextKit get gretting {
    return AnimatedTextKit(
      isRepeatingAnimation: false,
      animatedTexts: [
        TypewriterAnimatedText(
          controller.greeting,
          textStyle: GoogleFonts.inconsolata(
            textStyle: const TextStyle(
              fontSize: 20,
            ),
          ),
          speed: const Duration(milliseconds: 200),
        ),
      ],
    );
  }
}
